uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.04 - t * 1.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.54), cos(time * 1.38)) * 0.10;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.23 / 3.1415927, 1.03 / r - time * 0.76);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.85, 0.38, 0.95) * (0.21 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.22, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
