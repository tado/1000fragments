uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 24.42 - t * 5.70 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 10.78 - t * 5.70 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.01, length(p) * 2.75 - time * 0.58); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.44), field(p, time, 0.87));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
