uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.28 + sin(p.y * 5.73 + t * 0.90) * 3.04 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.30;
	{ p = vec2(atan(p.y, p.x) * 2.66, length(p) * 2.02 - time * 0.49); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.92, 0.59, 0.42) * (0.08 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
