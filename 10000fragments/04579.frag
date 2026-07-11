uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.44, 0.0)) * 17.18 - t * 5.33 + ph);
    float mb = sin(length(p + vec2(0.44, 0.0)) * 12.04 - t * 5.33 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.92), field(p, time, 1.84));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
