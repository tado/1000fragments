uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.28);
    float gsh = hash21(vec2(grow, floor(t * 3.52))) - 0.5;
    float gx = p.x + gsh * 0.67;
    v = sin(gx * 8.16 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.71));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.72;
	p *= 2.40;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, (time * 0.77), 0.0);
	vec3 col = palette(d * 0.99 + (time * 0.77) * 0.01, vec3(0.52, 0.53, 0.48), vec3(0.21, 0.22, 0.15), vec3(0.42, 0.42, 0.43), vec3(0.19, 0.46, 0.19));
	col += (hash21(gl_FragCoord.xy + fract((time * 0.77)) * 100.0) - 0.5) * 0.04;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 0.986, 1.015) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
