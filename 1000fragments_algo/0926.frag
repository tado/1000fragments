uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.16 - t * 0.59;
    v = sin(floor(lv * 3.1) / 3.1 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.53) * -0.16;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.20 / 3.1415927, 1.20 / r + (time * 0.53) * 0.53);
	tv.x += tv.y * 0.46;
	float d = field(tv, (time * 0.53), 0.0);
	vec3 col = palette((d) * 1.13 + (time * 0.53) * 0.24, vec3(0.30, 0.30, 0.41), vec3(0.16, 0.15, 0.21), vec3(0.44, 0.89, 0.51), vec3(0.18, 0.54, 0.98));
	col *= clamp(r * 1.26, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.51));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(1.040, 0.973, 0.911) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
