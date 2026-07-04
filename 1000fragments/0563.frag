uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.66 - t * 1.34;
    v = sin(floor(lv * 4.4) / 4.4 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.88;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.61), field(p, time, 1.23));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
