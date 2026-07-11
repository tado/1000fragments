uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 33.75 - t * 4.75 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 8.57 - t * 5.61 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	p = fract(p * 2.04) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.65, 0.19, 0.19) * (0.15 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
