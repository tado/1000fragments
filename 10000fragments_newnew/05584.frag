uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.38, 0.0)) * 10.70 - t * 3.61 + ph);
    float mb = sin(length(p + vec2(0.38, 0.0)) * 21.08 - t * 4.65 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.51; }
	p = abs(p);
	p *= 1.0 + 0.27 * sin(time * 4.08);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.44, 0.43, 0.58) * (0.07 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
