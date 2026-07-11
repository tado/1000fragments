uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.61);
    float gsh = hash21(vec2(grow, floor(t * 6.12))) - 0.5;
    float gx = p.x + gsh * 0.63;
    v = sin(gx * 18.38 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.88));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.93) * p * 13.35;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.68;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = mix(vec3(0.85, 0.92, 0.64), vec3(0.04, 0.01, 0.07), v);
	col *= 0.84 + 0.13 * sin(gl_FragCoord.y * 2.28 + time * 12.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
