uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.12 * cos(sa * 3 + t * 0.55 + ph);
    v = sin((sr - petal) * 14.22);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.10; p = rot2(2.35) * p; }
	p = rot2(p.y * 1.10 + time * 0.23) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.26), field(p, time, 0.52));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
