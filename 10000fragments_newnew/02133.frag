uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 5.06 + ga * 4.0 - t * 2.76 + ph);
    v = arm * exp(-gr * 1.02);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.45 / 3.1415927, 0.31 / r + time * 1.56);
	tv.x += tv.y * 0.23;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.48 + time * 0.22);
	col *= clamp(r * 2.86, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
