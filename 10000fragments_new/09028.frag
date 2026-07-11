uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.72 + vec2(t * 1.39, -t * 1.34) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.44 / 3.1415927, 1.30 / r + time * 0.66);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.51 + time * 0.10, vec3(0.41, 0.57, 0.56), vec3(0.44, 0.42, 0.39), vec3(0.81, 0.96, 1.38), vec3(0.93, 0.89, 0.39));
	col *= clamp(r * 1.62, 0.0, 1.0);
	col *= 0.83 + 0.10 * sin(gl_FragCoord.y * 1.93 + time * 10.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
