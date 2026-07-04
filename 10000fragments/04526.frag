uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.77 - t * 1.10;
    v = sin(floor(lv * 5.6) / 5.6 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.0 + 0.31 * sin(time * 3.78);
	p *= 1.25;
	{ float fr = length(p); p *= 1.0 + -0.72 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.86 + time * 0.06);
	col *= 0.89 + 0.14 * sin(gl_FragCoord.y * 1.53 + time * 11.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
