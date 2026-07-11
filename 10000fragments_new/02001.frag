uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 10.69 - t * 2.48 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 33.02 - t * 5.94 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.18;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.75), field(p, time, 1.51));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
