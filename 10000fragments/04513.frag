uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 39.07 - t * 7.64 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 15.46 - t * 7.64 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.07;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.68));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
