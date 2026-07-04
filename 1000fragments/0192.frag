uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.29 + t * 1.24) - 0.5) * 2.0;
    v = sin((p.y * 7.52 + zx * 1.35 + t * 2.42) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.43), cos(time * 0.64)) * 0.18;
	float an = atan(p.y, p.x) + time * -0.57;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.83 / 3.1415927, 0.56 / r + time * 2.68);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.32, 0.25, 0.45) * (0.07 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 2.68, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
