uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 36.51 - t * 5.41 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 24.72 - t * 5.48 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.50, lr * 2.31 + time * -0.40); }
	p.y += sin(p.x * 4.89 + time * 3.43) * 0.11;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.81, 0.32, 0.96) * (0.25 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
