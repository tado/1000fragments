uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 27.25 - t * 6.35 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 22.28 - t * 1.13 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.31;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.94, 0.17, 0.37) * (0.21 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
