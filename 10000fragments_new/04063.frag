uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.28 + vec2(t * 1.23, -t * 2.37) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.85 / 3.1415927, 0.43 / r + time * 0.79);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.12 + time * 0.17, vec3(0.43, 0.45, 0.50), vec3(0.31, 0.30, 0.50), vec3(0.94, 1.05, 0.97), vec3(0.59, 0.81, 0.34));
	col *= clamp(r * 1.49, 0.0, 1.0);
	col = mod(col * 2.76, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
