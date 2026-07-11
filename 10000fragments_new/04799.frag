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
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 7.49 * sin(t * 1.01) + t * 1.97 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.29 + ph), sin(lt * 4.0 + t * 0.83)) * 0.51;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.43) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -2.24 + time * 0.55) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.32);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.88 + time * 0.14, vec3(0.56, 0.51, 0.43), vec3(0.32, 0.41, 0.40), vec3(1.26, 0.77, 1.39), vec3(0.78, 0.27, 0.81));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
