uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.62);
    float gsh = hash21(vec2(grow, floor(t * 2.56))) - 0.5;
    float gx = p.x + gsh * 0.36;
    v = sin(gx * 6.17 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.87));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.52;
	float d = 0.5 + 0.5 * field(p, (time * 0.76), 0.0);
	vec2 hq = rot2(0.42) * p * 16.72;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.62;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = mix(vec3(0.94, 0.90, 0.91), vec3(0.08, 0.03, 0.15), v);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.975, 1.009, 0.943) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
