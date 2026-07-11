uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 17.33 - t * 5.61 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 39.69 - t * 7.26 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.07 / 3.1415927, 1.15 / r + time * 1.78);
	tv.x += tv.y * 0.41;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.07, vec3(0.58, 0.56, 0.53), vec3(0.40, 0.49, 0.43), vec3(1.10, 0.90, 1.15), vec3(0.04, 0.69, 0.55));
	col *= clamp(r * 1.22, 0.0, 1.0);
	col = fract(col * 2.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
