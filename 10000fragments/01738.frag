uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.53 - t * 5.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.31 * fr * fr; }
	p += vec2(-0.45, 0.38) * sin(length(p) * 2.18 - time * 0.87) * 0.18;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.06), field(p, time, 2.11));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
