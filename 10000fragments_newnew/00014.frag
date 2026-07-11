uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.93 + t * 0.70) - 0.5) * 2.0;
    v = sin((p.y * 2.07 + zx * 0.91 + t * 2.37) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.18;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.41 / 3.1415927, 1.03 / r - time * 1.52);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(1.00, 0.74, 0.84) * (0.10 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.49, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
