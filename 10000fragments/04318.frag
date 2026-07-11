uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.38, 0.0)) * 24.68 - t * 2.45 + ph);
    float mb = sin(length(p + vec2(0.38, 0.0)) * 37.85 - t * 2.45 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.72, length(p) * 4.69 - time * 0.52); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.30), field(p, time, 0.59));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
