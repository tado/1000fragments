uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 32.96 - t * 2.20 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 28.44 - t * 2.20 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.49 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.53), field(p, time, 1.07));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
