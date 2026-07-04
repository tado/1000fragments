uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.18);
    float gsh = hash21(vec2(grow, floor(t * 9.65))) - 0.5;
    float gx = p.x + gsh * 0.60;
    v = sin(gx * 15.35 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.43));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.02;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.49) * p * 11.24;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.54;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = mix(vec3(0.01, 0.12, 0.05), vec3(0.81, 0.79, 0.76), v);
	col = mod(col * 1.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
