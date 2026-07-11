uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 13.76 - t * 6.42 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 31.72 - t * 6.42 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.31;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.24), field(p, time, 0.49));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
