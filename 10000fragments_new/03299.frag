uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.37 + 0.30 * pow(abs(cos(ra * 3.0 + t * 0.60)), 0.94);
    v = sin((rr - pet) * 16.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	p *= 2.33;
	p = rot2(0.42) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.93, 0.79, 0.78) * (0.05 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
