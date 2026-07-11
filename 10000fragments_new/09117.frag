uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.94 - t * 4.13 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.31 / 3.1415927, 1.13 / r + time * 0.70);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.75, 0.18, 0.93) * (0.22 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 2.36, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
