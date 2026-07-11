uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.99 * sin(mf + 3.0) + ph), cos(t * 0.99 * cos(mf + 3.0) + ph));
        ms += 0.053 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.23 * cos(sa * 4 + t * 0.91 + ph);
    v = sin((sr - petal) * 8.04);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.75;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.40, 0.33) * sin(length(p) * 5.56 - time * 1.59) * 0.40;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.04);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.04 + time * 0.28, vec3(0.60, 0.53, 0.51), vec3(0.44, 0.33, 0.30), vec3(1.22, 0.96, 0.75), vec3(0.13, 0.89, 0.97));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
