uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.28; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 15.09 - t * 0.85 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.45 + ph), sin(lt * 1.0 + t * 0.94)) * 0.69;
        md = min(md, length(p - lp)); }
    v = exp(-md * 6.61) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	p = rot2(1.66) * p;
	p *= 3.01;
	{ p = vec2(atan(p.y, p.x) * 2.87, length(p) * 3.47 - time * 0.81); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.94);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.75 + time * 0.05, vec3(0.46, 0.41, 0.40), vec3(0.40, 0.45, 0.34), vec3(1.37, 0.76, 1.30), vec3(0.21, 0.72, 0.40));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
