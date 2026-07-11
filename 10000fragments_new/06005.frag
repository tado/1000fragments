uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.76 + jf * 4.0), cos(t * 0.38 * jf)) * 0.87;
        xs += sin(length(p - im) * 184.19 - t * 9.22 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.58;
	p = rot2(length(p) * -1.19 + time * 1.45) * p;
	p = rot2(p.y * -1.43 + time * 1.18) * p;
	{ float fr = length(p); p *= 1.0 + -0.29 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.82, 0.74, 0.24) * (0.06 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
