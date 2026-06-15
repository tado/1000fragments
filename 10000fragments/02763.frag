uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 31.18 - t * 7.26 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 31.13 - t * 7.26 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.27), field(p, time, 0.53));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
