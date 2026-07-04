uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.32 + ga * 2.0 - t * 2.60 + ph);
    v = arm * exp(-gr * 1.05);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.09 / 3.1415927, 1.01 / r + time * 2.11);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.00 + time * 0.66);
	col *= clamp(r * 2.76, 0.0, 1.0);
	col *= 0.83 + 0.18 * sin(gl_FragCoord.y * 2.40 + time * 11.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
