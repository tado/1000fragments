uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.14 * cos(sa * 8 + t * 1.79 + ph);
    v = sin((sr - petal) * 8.37);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.22;
	p = rot2(length(p) * -3.80 + time * 1.16) * p;
	p *= 2.59;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.48; p = rot2(2.08) * p; }
	p = rot2(time * -1.29) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.29, 0.53, 1.41) + vec3(0.08, 0.17, 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
