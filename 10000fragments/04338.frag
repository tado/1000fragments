uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 18.51 - t * 7.57 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 29.51 - t * 7.57 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.23), field(p, time, 0.45));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
