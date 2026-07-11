uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.36);
    float gsh = hash21(vec2(grow, floor(t * 6.75))) - 0.5;
    float gx = p.x + gsh * 1.08;
    v = sin(gx * 16.40 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.38));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.89;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.83) * p * 20.53;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.64;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = mix(vec3(0.79, 0.80, 0.81), vec3(0.01, 0.06, 0.01), v);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
