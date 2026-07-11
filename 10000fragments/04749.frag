uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 12.93 - t * 6.97 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 14.13 - t * 6.97 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.21;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.96), field(p, time, 1.92));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
