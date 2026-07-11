uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.52 + ga * 2.0 - t * 1.46 + ph);
    v = arm * exp(-gr * 0.71);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p = rot2(length(p) * 2.01 + time * 0.52) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.54, 0.99, 0.91) + vec3(0.05, 0.03, 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
