uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 7.78);
    float gsh = hash21(vec2(grow, floor(t * 5.89))) - 0.5;
    float gx = p.x + gsh * 0.78;
    v = sin(gx * 13.92 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.87));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.10;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.26) * p * 11.06;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.52;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = mix(vec3(0.88, 0.83, 0.71), vec3(0.14, 0.00, 0.20), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
