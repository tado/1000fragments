uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.30);
    float gsh = hash21(vec2(grow, floor(t * 9.74))) - 0.5;
    float gx = p.x + gsh * 0.40;
    v = sin(gx * 7.03 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.61));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.04;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.30) * p * 16.52;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.60;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = mix(vec3(0.13, 0.09, 0.03), vec3(0.77, 0.91, 0.70), v);
	col = fract(col * 1.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
