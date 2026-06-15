uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.19 * cos(sa * 9 + t * 2.79 + ph);
    v = sin((sr - petal) * 12.60);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.13; p = rot2(2.44) * p; }
	p = fract(p * 2.59) - 0.5;
	p = rot2(0.73) * p;
	p *= 3.49;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.74, 1.16, 1.58) + vec3(0.07, 0.08, 0.14);
	col = fract(col * 1.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
