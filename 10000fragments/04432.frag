uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 33.04 - t * 2.98 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 29.43 - t * 2.98 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.34;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.67), field(p, time, 1.34));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
