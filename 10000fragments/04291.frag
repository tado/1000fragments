uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 14.73 - t * 2.52 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 8.70 - t * 2.52 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.01), field(p, time, 2.01));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
