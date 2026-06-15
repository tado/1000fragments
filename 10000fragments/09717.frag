uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 34.25 - t * 4.70 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 12.06 - t * 4.70 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.79;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.75));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
