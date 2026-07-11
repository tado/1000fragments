uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.18 - t * 8.00 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.46 / 3.1415927, 0.80 / r - time * 0.75);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.21, 0.49, 0.67) * (0.09 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 2.79, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
