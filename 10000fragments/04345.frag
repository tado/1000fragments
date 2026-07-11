uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 19.36 - t * 7.10 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 23.45 - t * 7.10 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.87), field(p, time, 1.75));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.95);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
