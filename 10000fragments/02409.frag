uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.39 - t * 1.15;
    v = sin(floor(lv * 2.2) / 2.2 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.17, 0.21, 0.75) * (0.24 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
