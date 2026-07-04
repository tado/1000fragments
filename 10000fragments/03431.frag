uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.02);
    float gsh = hash21(vec2(grow, floor(t * 8.54))) - 0.5;
    float gx = p.x + gsh * 1.20;
    v = sin(gx * 18.60 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.67));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.12;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.66) * p * 20.41;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = mix(vec3(0.78, 0.83, 0.98), vec3(0.03, 0.14, 0.09), v);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
