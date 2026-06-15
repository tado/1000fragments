uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.52, 0.0)) * 20.10 - t * 1.01 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 30.26 - t * 1.01 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	p *= 2.18;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.44), field(p, time, 0.87));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.49, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
