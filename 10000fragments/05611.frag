uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.59 - t * 0.66;
    v = sin(floor(lv * 2.0) / 2.0 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.42;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.12), field(p, time, 2.25));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
