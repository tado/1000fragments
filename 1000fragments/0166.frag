uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 15.83 - t * 7.40 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 11.18 - t * 2.12 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.89;
	p += vec2(0.94, -0.95) * sin(length(p) * 4.09 - time * 1.89) * 0.19;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.93), field(p, time, 1.86));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
